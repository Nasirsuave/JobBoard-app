import React from "react";

export default function MultiStepContainer({ step, steps, renderFields }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out "
        style={{
          width: `${steps.length * 100}%`,
          transform: `translateX(-${step * (100 / steps.length)}%)`,
        }}
      >
        {steps.map((s) => (
          <div key={s.title} className="w-full ">
            <div className="grid grid-cols-1 gap-4  ">
              {renderFields(s.fields)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
