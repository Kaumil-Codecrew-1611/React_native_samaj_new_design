import * as d3 from 'd3';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PanResponder, ScrollView, View } from 'react-native';
import Svg, { G, Line, Rect, Text } from 'react-native-svg';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const nodeWidth = 100;
const nodeHeight = 40;
const baseHorizontalSpacing = 60;
const verticalSpacing = 100;

const calculateHorizontalSpacing = (node) => {
    let maxChildren = 0;
    node.each(d => {
        if (d.children) {
            maxChildren = Math.max(maxChildren, d.children.length);
        }
    });
    return nodeWidth + (maxChildren > 1 ? maxChildren * baseHorizontalSpacing : baseHorizontalSpacing);
};

const TreeNode = ({ node, x, y, children, onPress }) => (
    <>
        <Rect x={x} y={y} width={nodeWidth} onPress={() => onPress(node)} height={nodeHeight} fill="white" stroke="black" />
        <Text x={x + nodeWidth / 2} y={y + nodeHeight / 2} textAnchor="middle" alignmentBaseline="middle">
            {node.firstname}
        </Text>
        {node.wife && (
            <>
                <Rect x={x + nodeWidth + baseHorizontalSpacing / 2} y={y} width={nodeWidth} height={nodeHeight} fill="white" stroke="black" onPress={() => onPress(node.wife)} />
                <Text x={x + nodeWidth + baseHorizontalSpacing / 2 + nodeWidth / 2} y={y + nodeHeight / 2} textAnchor="middle" alignmentBaseline="middle">
                    {node.wife.firstname}
                </Text>
                <Line x1={x + nodeWidth} y1={y + nodeHeight / 2} x2={x + nodeWidth + baseHorizontalSpacing / 2} y2={y + nodeHeight / 2} stroke="black" />
            </>
        )}
        {children}
    </>
);

const FamilyTree = ({ data, navigation }) => {
    const root = d3.hierarchy(data);
    const horizontalSpacing = calculateHorizontalSpacing(root);
    const treeLayout = d3.tree().nodeSize([horizontalSpacing, verticalSpacing]);

    treeLayout(root);

    const [pan, setPan] = useState({ x: 0, y: 0 });
    const panResponder = useRef(
        PanResponder.create({
            onPanResponderMove: (evt, gestureState) => {
                setPan(prevPan => ({
                    x: prevPan.x + gestureState.dx,
                    y: prevPan.y + gestureState.dy
                }));
            },
        })
    ).current;

    const handleNodePress = (node) => {
        const userId = node._id
        navigation.navigate('NodeDetails', { userId, node });
    };
    const nodes = root.descendants();
    const minX = Math.min(...nodes.map(d => d.x));
    const maxX = Math.max(...nodes.map(d => d.x));
    const minY = Math.min(...nodes.map(d => d.y));
    const maxY = Math.max(...nodes.map(d => d.y));
    const svgWidth = maxX - minX + nodeWidth + horizontalSpacing;
    const svgHeight = maxY - minY + nodeHeight + verticalSpacing;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.parentScrollViewStyle} horizontal>
                <ScrollView style={styles.childScrollViewStyle}>
                    <Svg width={svgWidth} height={svgHeight} {...panResponder.panHandlers}>
                        <G transform={`translate(${pan.x},${pan.y})`}>
                            {root.descendants().map((d, i) => {
                                const x = d.x - minX;
                                const y = d.y - minY;

                                return (
                                    <TreeNode
                                        key={i}
                                        node={d.data}
                                        x={x}
                                        y={y}
                                        onPress={handleNodePress}
                                        children={
                                            d.children && d.children.map((child, j) => {
                                                const childX = child.x - minX;
                                                const childY = child.y - minY;

                                                return (
                                                    <Line
                                                        key={j}
                                                        x1={x + nodeWidth / 2}
                                                        y1={y + nodeHeight}
                                                        x2={childX + nodeWidth / 2}
                                                        y2={childY}
                                                        stroke="black"
                                                    />
                                                );
                                            })
                                        }
                                    />
                                );
                            })}
                        </G>
                    </Svg>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const ViewFamilyTree = ({ navigation }) => {
    const { allDataOfFamilyById, state } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        (async function () {
            try {
                const contentOfAllFamilyMembers = await allDataOfFamilyById(allUserInfo._id);
                setUserData(contentOfAllFamilyMembers);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [state.addFamilyMemberDetails, state.handleDeleteProfileUser, state.updateFamilyDetailsUser]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FamilyTree data={userData} navigation={navigation} />
        </View>
    );
};

const styles = {
    parentScrollViewStyle: {
        flex: 1,
    },
    childScrollViewStyle: {
        flex: 1,
    },
};

export default ViewFamilyTree;
