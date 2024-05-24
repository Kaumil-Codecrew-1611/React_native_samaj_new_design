// src/utils/errorHandler.js
import { useToast } from 'native-base';

const errorHandler = (error) => {
    const toast = useToast();

    toast.show({
        render: () => {
            return (
                <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status="error" variant="subtle">
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
                            <HStack space={2} flexShrink={1} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" flexShrink={1}>
                                    {error.message}
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" />}
                                _icon={{ color: "darkText" }}
                                onPress={() => toast.close(id)}
                            />
                        </HStack>
                        <Text px="6">{error.message}</Text>
                    </VStack>
                </Alert>
            );
        },
    });
};

export default errorHandler;
