import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

// Mounts the print content only after the user asks to print, so it is not
// kept rendered (and hidden) on the page the rest of the time.
// Render the print content only while `isPrinting` is true, attached to
// `contentRef`. `ready` lets callers wait for async data before printing.
const usePrintOnDemand = (options = {}, ready = true) => {
  const contentRef = useRef(null);
  const hasPrintedRef = useRef(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const reactToPrint = useReactToPrint({
    ...options,
    contentRef,
    onAfterPrint: () => {
      setIsPrinting(false);
      options.onAfterPrint?.();
    },
    onPrintError: (location, error) => {
      setIsPrinting(false);
      options.onPrintError?.(location, error);
    }
  });

  useEffect(() => {
    if (!isPrinting) {
      hasPrintedRef.current = false;
      return;
    }
    if (ready && contentRef.current && !hasPrintedRef.current) {
      hasPrintedRef.current = true;
      reactToPrint();
    }
  }, [isPrinting, ready, reactToPrint]);

  const handlePrint = () => setIsPrinting(true);

  return { contentRef, isPrinting, handlePrint };
};

export default usePrintOnDemand;
