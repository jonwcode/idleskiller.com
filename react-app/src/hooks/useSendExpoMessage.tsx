export default function useSendExpoMessage(message: object) {
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));

  return null;
}
