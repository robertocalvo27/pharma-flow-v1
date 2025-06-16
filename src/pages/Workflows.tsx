import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { WorkflowCard } from '../components/workflows/WorkflowCard';
import { WorkflowSteps } from '../components/workflows/WorkflowSteps';
import { useStore } from '../store';
import { Workflow } from '../types';
import { mockWorkflows } from '../data/mockData';

export const Workflows: React.FC = () => {
  const { workflows, setWorkflows, updateWorkflowStep } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  useEffect(() => {
    if (workflows.length === 0) {
      setWorkflows(mockWorkflows);
    }
  }, [workflows.length, setWorkflows]);
  
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || workflow.status === statusFilter;
    const matchesType = !typeFilter || workflow.workflowType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'in_progress', label: 'En Proceso' },
    { value: 'completed', label: 'Completado' },
    { value: 'rejected', label: 'Rechazado' },
    { value: 'paused', label: 'Pausado' }
  ];
  
  const typeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'registration', label: 'Registro' },
    { value: 'renewal', label: 'Renovación' },
    { value: 'variation', label: 'Variación' }
  ];
  
  const handleViewWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsDetailModalOpen(true);
  };
  
  const handleUpdateStep = (workflowId: string, stepId: string, status: string) => {
    updateWorkflowStep(workflowId, stepId, status);
    // Refresh the selected workflow if it's the one being updated
    if (selectedWorkflow && selectedWorkflow.id === workflowId) {
      const updatedWorkflow = workflows.find(w => w.id === workflowId);
      if (updatedWorkflow) {
        setSelectedWorkflow(updatedWorkflow);
      }
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows Regulatorios</h1>
          <p className="text-gray-600 mt-1">
            Gestiona los procesos de aprobación y registro de productos
          </p>
        </div>
        <Button icon={Plus}>
          Nuevo Workflow
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar workflows..."
            icon={Search}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            placeholder="Filtrar por estado"
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            placeholder="Filtrar por tipo"
            value={typeFilter}
            onChange={setTypeFilter}
            options={typeOptions}
          />
        </div>
        <Button variant="secondary" icon={Filter}>
          Más Filtros
        </Button>
      </div>
      
      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onView={handleViewWorkflow}
            onUpdateStep={handleUpdateStep}
          />
        ))}
      </div>
      
      {/* Workflow Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedWorkflow(null);
        }}
        title={selectedWorkflow ? `Workflow: ${selectedWorkflow.productName}` : ''}
        size="xl"
      >
        {selectedWorkflow && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">País:</span>
                <span className="ml-2">{selectedWorkflow.countryName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo:</span>
                <span className="ml-2 capitalize">{selectedWorkflow.workflowType}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Asignado a:</span>
                <span className="ml-2">{selectedWorkflow.assignedToName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Fecha límite:</span>
                <span className="ml-2">{new Date(selectedWorkflow.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <WorkflowSteps
              steps={selectedWorkflow.steps}
              onUpdateStep={(stepId, status) => 
                handleUpdateStep(selectedWorkflow.id, stepId, status)
              }
            />
          </div>
        )}
      </Modal>
    </div>
  );
};