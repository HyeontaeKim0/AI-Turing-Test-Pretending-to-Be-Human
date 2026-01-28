"use client";

import type { CommentChoice } from "@/types/game";

const hintStyle: Record<CommentChoice["hint"], string> = {
  danger_robot:
    "border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 border",
  danger_expose:
    "border-red-300 bg-red-50 hover:bg-red-100 text-red-800 border",
  safe:
    "border-green-300 bg-green-50 hover:bg-green-100 text-green-800 border",
};

interface ChoiceButtonsProps {
  choices: CommentChoice[];
  onChoice: (choice: CommentChoice) => void;
}

export function ChoiceButtons({ choices, onChoice }: ChoiceButtonsProps) {
  return (
    <div className="space-y-1.5">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => onChoice(choice)}
          className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${hintStyle[choice.hint]}`}
        >
          <span>{choice.text}</span>
          {choice.description && (
            <span className="ml-2 text-[10px] opacity-70">
              ({choice.description})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
