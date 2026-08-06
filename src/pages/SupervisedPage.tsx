import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CodeBlock } from "@/components/shared/CodeBlock";

// Regression imports
import CorrelationExplainer from "@/components/supervised/regression/CorrelationExplainer";
import CorrelationScatterDemo from "@/components/supervised/regression/CorrelationScatterDemo";
import PearsonFormula from "@/components/supervised/regression/PearsonFormula";
import PearsonCalculator from "@/components/supervised/regression/PearsonCalculator";
import RegressionLineDemo from "@/components/supervised/regression/RegressionLineDemo";
import LinearRegressionTypes from "@/components/supervised/regression/LinearRegressionTypes";
import RegressionApplications from "@/components/supervised/regression/RegressionApplications";

// Classification imports
import WasteSortGame from "@/components/supervised/classification/WasteSortGame";
import ClassificationStepper from "@/components/supervised/classification/ClassificationStepper";
import ClassificationTypesTable from "@/components/supervised/classification/ClassificationTypesTable";
import KnnBeforeAfterToggle from "@/components/supervised/classification/KnnBeforeAfterToggle";
import KnnInteractiveDemo from "@/components/supervised/classification/KnnInteractiveDemo";
import KnnProsConsTable from "@/components/supervised/classification/KnnProsConsTable";

const PYTHON_CODE = `
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data: age vs weight
X = np.array([[10], [12], [14], [16], [18], [20], [22], [24]])
y = np.array([30, 35, 42, 48, 55, 60, 63, 65])

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Results
print(f"Slope (b): {model.coef_[0]:.4f}")
print(f"Intercept (a): {model.intercept_:.4f}")
print(f"R² Score: {model.score(X, y):.4f}")

# Predict for age = 26
prediction = model.predict([[26]])
print(f"Predicted weight at age 26: {prediction[0]:.1f} kg")
`.trim();

export default function SupervisedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
      {/* Header */}
      <ScrollReveal>
        <SectionHeading
          tag="Supervised Learning"
          title="Learning with a Teacher"
          subtitle="Supervised learning trains on labeled data — every example includes both the input and the correct answer. Explore Regression and Classification below."
          accentColor="#22c55e"
          align="center"
        />
      </ScrollReveal>

      {/* Tabs */}
      <Tabs defaultValue="regression" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="h-11 px-1 gap-1">
            <TabsTrigger value="regression" className="font-heading font-semibold px-6 data-[state=active]:text-green-500 data-[state=active]:bg-green-500/15 data-[state=active]:shadow-sm rounded-xl transition-all">
              📈 Regression
            </TabsTrigger>
            <TabsTrigger value="classification" className="font-heading font-semibold px-6 data-[state=active]:text-blue-500 data-[state=active]:bg-blue-500/15 data-[state=active]:shadow-sm rounded-xl transition-all">
              🏷️ Classification
            </TabsTrigger>
          </TabsList>
        </div>

        {/* REGRESSION TAB */}
        <TabsContent value="regression" className="space-y-16">
          <ScrollReveal direction="left">
            <CorrelationExplainer />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <CorrelationScatterDemo />
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PearsonFormula />
              <PearsonCalculator />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <RegressionLineDemo />
          </ScrollReveal>

          <ScrollReveal direction="up">
            <LinearRegressionTypes />
          </ScrollReveal>

          <ScrollReveal direction="up">
            <RegressionApplications />
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-foreground text-lg">Python Example: sklearn</h3>
              <CodeBlock code={PYTHON_CODE} language="python" title="linear_regression.py" />
            </div>
          </ScrollReveal>
        </TabsContent>

        {/* CLASSIFICATION TAB */}
        <TabsContent value="classification" className="space-y-16">
          <ScrollReveal>
            <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                What is Classification?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Classification algorithms assign input data to one of several predefined <strong className="text-foreground">discrete classes</strong>.
                Unlike regression (which predicts a number), classification predicts a category — e.g., "this email is spam" or "this image is a cat."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <WasteSortGame />
          </ScrollReveal>

          <ScrollReveal direction="left">
            <ClassificationStepper />
          </ScrollReveal>

          <ScrollReveal>
            <ClassificationTypesTable />
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-8">
              <SectionHeading
                tag="K-Nearest Neighbours"
                title="KNN: Classify by Proximity"
                subtitle="KNN is one of the simplest classification algorithms — it classifies a new point based on the majority class of its K nearest neighbours."
                accentColor="#22c55e"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <KnnBeforeAfterToggle />
                <KnnInteractiveDemo />
              </div>
              <KnnProsConsTable />
            </div>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  );
}
