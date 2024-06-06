// ErrorBoundary.js
import React from 'react';
import { Alert, VStack, HStack, Text, IconButton, CloseIcon } from 'native-base';
import { useToast } from 'native-base';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {/*r <ErrorToast error={this.state.error} /> */}
        </>
      );
    }

    return this.props.children;
  }
}

const ErrorToast = ({ error }) => {
  const toast = useToast();

  React.useEffect(() => {
    if (error) {
      const id = toast.show({
        render: () => (
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
        ),
      });
    }
  }, [error, toast]);

  return null;
};

export default ErrorBoundary;