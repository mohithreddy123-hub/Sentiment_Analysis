import React from 'react';

const examples = [
  "I absolutely love this product! It's life-changing and works perfectly every time.",
  "Worst experience ever. The service was slow and the staff was extremely rude. Avoid at all costs.",
  "The meeting is scheduled for 3 PM tomorrow in the conference room. Please bring your updated reports.",
  "I'm not saying it was bad, but I've definitely had better meals for half the price. 🙄",
  "OMG! I can't believe I won! This is the best day of my life!!! 🚀🎉🔥",
  "The weather is quite overcast today, with a slight chance of rain in the evening hours.",
  "The battery life is decent, but the screen brightness is a bit disappointing in direct sunlight.",
  "Utterly disappointed with the recent update. It broke half the features I use daily. Please fix this!",
  "Quantum computing utilizes the principles of superposition and entanglement to perform complex calculations.",
  "Just had the most amazing coffee at that new place downtown. Highly recommend the lavender latte!",
  "I've been using this platform for over six months now, and I must say the experience has been quite a rollercoaster. Initially, the onboarding process was incredibly smooth, and I was impressed by the intuitive interface and the speed of the service. However, as I started using more advanced features, I began to encounter several bugs that occasionally disrupted my workflow. The customer support team has been responsive and helpful, which mitigates some of the frustration, but I really hope the development team focuses on stability in the next few updates. Overall, it's a solid tool that I would recommend to others, provided they have a bit of patience for the occasional technical hiccup."
];

const TextInputExamples: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Text Input Examples</h2>
      <div className="grid gap-4">
        {examples.map((text, index) => (
          <div 
            key={index} 
            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              // Copy to clipboard or trigger an event
              navigator.clipboard.writeText(text);
              alert('Example copied to clipboard!');
            }}
          >
            <p className="text-slate-600 dark:text-slate-300 italic">"{text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextInputExamples;
