import React from 'react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { WelcomeStep } from './steps/WelcomeStep';
import { PlanSelectionStep } from './steps/PlanSelectionStep';
import { CompanySetupStep } from './steps/CompanySetupStep';
import { FirstProductStep } from './steps/FirstProductStep';
import { ExploreStep } from './steps/ExploreStep';

export const OnboardingWizard: React.FC = () => {
  const { 
    onboarding, 
    setOnboardingStep, 
    completeOnboardingStep, 
    setShowOnboarding, 
    skipOnboarding,
    user 
  } = useStore();

  // Mostrar si hay usuario y el onboarding está habilitado
  if (!user || !onboarding.showOnboarding) {
    return null;
  }

  const currentStepData = onboarding.steps[onboarding.currentStep];
  const isLastStep = onboarding.currentStep === onboarding.totalSteps - 1;
  const isFirstStep = onboarding.currentStep === 0;

  const handleNext = () => {
    if (currentStepData) {
      completeOnboardingStep(currentStepData.id);
    }
    
    if (isLastStep) {
      setShowOnboarding(false);
    } else {
      setOnboardingStep(onboarding.currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setOnboardingStep(onboarding.currentStep - 1);
    }
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  const renderStepContent = () => {
    if (!currentStepData) return null;

    switch (currentStepData.component) {
      case 'WelcomeStep':
        return <WelcomeStep />;
      case 'PlanSelectionStep':
        return <PlanSelectionStep />;
      case 'CompanySetupStep':
        return <CompanySetupStep />;
      case 'FirstProductStep':
        return <FirstProductStep />;
      case 'ExploreStep':
        return <ExploreStep />;
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">PF</span>
              </div>
              <span className="font-bold text-lg text-gray-900">PharmaFlow</span>
            </div>
            <div className="text-sm text-gray-500">
              Paso {onboarding.currentStep + 1} de {onboarding.totalSteps}
            </div>
          </div>
          
          <button
            onClick={handleSkip}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-2">
            {onboarding.steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${index < onboarding.currentStep 
                    ? 'bg-green-500 text-white' 
                    : index === onboarding.currentStep 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {index < onboarding.currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < onboarding.steps.length - 1 && (
                  <div className={`
                    w-12 h-1 mx-2 rounded-full transition-all duration-300
                    ${index < onboarding.currentStep ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <h2 className="text-xl font-bold text-gray-900">{currentStepData?.title}</h2>
            <p className="text-gray-600 text-sm">{currentStepData?.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto min-h-0">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {onboarding.skipAvailable && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                Saltar configuración
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {!isFirstStep && (
                          <Button
              variant="secondary"
              onClick={handlePrevious}
              icon={ArrowLeft}
              iconPosition="left"
            >
              Anterior
            </Button>
            )}
            
            <Button
              variant="primary"
              onClick={handleNext}
              icon={isLastStep ? Check : ArrowRight}
              iconPosition="right"
            >
              {isLastStep ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 