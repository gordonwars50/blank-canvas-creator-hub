import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-20 lg:py-40 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-white">
              See the Difference
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-400">
              From messy uploads and scattered tools to a clean, unified workflow—see how YouManage helps creators stay consistent, publish smarter, and manage everything in one place.
              Clear structure. Better output. Less stress.
            </p>
          </div>
          <div className="pt-12 w-full flex justify-center">
            <div
              className="relative overflow-hidden rounded-2xl select-none"
              style={{ width: "900px", height: "600px", maxWidth: "100%" }}
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              
              <div
                className="bg-gray-300 h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-gray-300 rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none text-black" />
                </button>
              </div>
              {/* AFTER image (right side - background) */}
              <img
                src="/landing-page_images/comparisonafter.png"
                alt="YouTube channel AFTER - 100K subscribers"
                className="absolute left-0 top-0 w-full h-full rounded-2xl select-none border border-gray-700"
              />
              {/* BEFORE image (left side - clipped) */}
              <img
                src="/landing-page_images/comparsisonbefore.png"
                alt="YouTube channel BEFORE - 1K subscribers"
                className="absolute left-0 top-0 z-10 w-full h-full rounded-2xl select-none border border-gray-700"
                style={{
                  clipPath: "inset(0 " + (100 - inset) + "% 0 0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
