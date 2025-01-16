import { useComputed, useSignal } from "@preact/signals-react";
import { Container, Text } from "@react-three/uikit";
import { useXRStore } from "@react-three/xr";
import { useCallback, useEffect } from "react";

export function EnterXRButton() {
  const store = useXRStore();

  const vr = useSignal(false);
  const ar = useSignal(false);

  const text = useComputed(() => {
    if (ar.value) {
      return "Enter AR";
    } else if (vr.value) {
      return "Enter VR";
    } else {
      return "No Support";
    }
  });

  useEffect(() => {
    function onSessionStarted() {
      if (navigator.xr) {
        navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
          vr.value = supported;
        });
        navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
          ar.value = supported;
        });
      }
    }
    onSessionStarted();
  }, []);
  const handleClick = useCallback(() => {
    if (ar.value) {
      store.enterXR("immersive-ar");
    } else if (vr.value) {
      store.enterXR("immersive-vr");
    }
  }, [ar.value, vr.value, store]);

  return (
    <Container
      onClick={handleClick}
      backgroundColor={"#f0f0f0"}
      borderRadius={2}
      borderColor={"black"}
      borderWidth={1}
      padding={10}
    >
      <Text>{text}</Text>
    </Container>
  );
}
