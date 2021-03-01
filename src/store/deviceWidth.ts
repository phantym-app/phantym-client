import { matchesWidth } from '@logic/matchesWidth';
import { useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

function getWidth() {
  // 420px maximum width: cover all smartphones in portrait mode
  // 421px to 767px width: most smartphones in landscape mode
  // 768px to 1023px: most Android tablets and iPads in portrait mode
  // 1024px to 1365px: most Android tablets and iPads in landscape mode, older desktop/laptop monitors
  // 1366px and above: iPad PRO, HDready and FullHD desktop laptop monitors

  return {
    maxMobilePortrait: matchesWidth('419', 'max'),
    minMobileLandscape: matchesWidth('420', 'min'),
    maxMobile: matchesWidth('767', 'max'),
    minTablet: matchesWidth('768', 'min'),
    maxTabletPortrait: matchesWidth('1023', 'max'),
    minTabletLandscape: matchesWidth('1024', 'min'),
    maxTablet: matchesWidth('1365', 'max'),
    minDesktop: matchesWidth('1366', 'min'),
  };
}

function useDeviceWidth() {
  const [deviceWidth, setDeviceWidth] = useState<{
    maxMobilePortrait: boolean;
    minMobileLandscape: boolean;
    maxMobile: boolean;
    minTablet: boolean;
    maxTabletPortrait: boolean;
    minTabletLandscape: boolean;
    maxTablet: boolean;
    minDesktop: boolean;
  }>(getWidth());

  useEffect(function () {
    function update() {
      setDeviceWidth(getWidth());
    }

    addEventListener('resize', update);

    return function cleanup() {
      removeEventListener('resize', update);
    };
  }, []);

  return deviceWidth;
}

const { Provider, useContainer } = createContainer(useDeviceWidth);
export { Provider as DeviceWidthProvider, useContainer as useDeviceWidth };
