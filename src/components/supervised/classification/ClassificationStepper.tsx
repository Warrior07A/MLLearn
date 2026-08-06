import { SectionHeading } from "@/components/shared/SectionHeading";
import { StepTimeline } from "@/components/shared/StepTimeline";

const steps = [
  { title: "Define Classes", description: "Identify the possible output categories (e.g., Spam / Not Spam, Cat / Dog / Bird)." },
  { title: "Extract Features", description: "Convert raw data into meaningful numeric features the algorithm can process." },
  { title: "Prepare Training Data", description: "Collect labeled examples: each example has features and the correct class label." },
  { title: "Train the Model", description: "Feed training data to the classifier. It adjusts internal parameters to learn the mapping from features → class." },
  { title: "Make Predictions", description: "For unseen input, the model outputs the most likely class based on what it learned." },
];

export default function ClassificationStepper() {
  return (
    <div className="space-y-6">
      <SectionHeading
        tag="How it Works"
        title="The Classification Pipeline"
        subtitle="Every classification model follows these core steps — from raw data to a prediction."
        accentColor="#22c55e"
      />
      <StepTimeline steps={steps} color="#22c55e" />
    </div>
  );
}
