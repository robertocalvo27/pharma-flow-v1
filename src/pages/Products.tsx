import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductForm } from '../components/products/ProductForm';
import { DossiersModal } from '../components/products/DossiersModal';
import { DossierDetailModal } from '../components/products/DossierDetailModal';
import { useStore } from '../store';
import { Product, Dossier } from '../types';
import { mockProducts } from '../data/mockData';

export const Products: React.FC = () => {
  const { products, setProducts, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDossiersModalOpen, setIsDossiersModalOpen] = useState(false);
  const [isDossierDetailModalOpen, setIsDossierDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
  
  useEffect(() => {
    if (products.length === 0) {
      setProducts(mockProducts);
    }
  }, [products.length, setProducts]);
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'draft', label: 'Borrador' },
    { value: 'submitted', label: 'Enviado' },
    { value: 'approved', label: 'Aprobado' },
    { value: 'rejected', label: 'Rechazado' },
    { value: 'expired', label: 'Vencido' }
  ];
  
  const handleCreateProduct = (productData: Partial<Product>) => {
    addProduct(productData as Product);
    setIsCreateModalOpen(false);
  };
  
  const handleEditProduct = (productData: Partial<Product>) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    }
  };
  
  const handleDeleteProduct = (product: Product) => {
    if (confirm(`¿Estás seguro de que deseas eliminar ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };
  
  const handleViewProduct = (product: Product) => {
    // TODO: Implement product view modal or navigate to product detail page
    console.log('View product:', product);
  };
  
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleViewDossiers = (product: Product) => {
    setSelectedProduct(product);
    setIsDossiersModalOpen(true);
  };

  const handleViewDossier = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setIsDossiersModalOpen(false);
    setIsDossierDetailModalOpen(true);
  };

  const handleCloseDossierDetail = () => {
    setIsDossierDetailModalOpen(false);
    setSelectedDossier(null);
    if (selectedProduct) {
      setIsDossiersModalOpen(true);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos Farmacéuticos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona el catálogo completo de productos farmacéuticos
          </p>
        </div>
        <Button 
          icon={Plus} 
          onClick={() => setIsCreateModalOpen(true)}
        >
          Nuevo Producto
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar productos..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
        <Button variant="secondary" icon={Filter}>
          Más Filtros
        </Button>
      </div>
      
      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        onView={handleViewProduct}
        onEdit={handleEditClick}
        onDelete={handleDeleteProduct}
        onViewDossiers={handleViewDossiers}
      />
      
      {/* Create Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Producto"
        size="lg"
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Editar Producto"
        size="lg"
      >
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onSubmit={handleEditProduct}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </Modal>

      {/* Dossiers Modal */}
      {selectedProduct && (
        <DossiersModal
          isOpen={isDossiersModalOpen}
          onClose={() => {
            setIsDossiersModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onViewDossier={handleViewDossier}
        />
      )}

      {/* Dossier Detail Modal */}
      {selectedDossier && (
        <DossierDetailModal
          isOpen={isDossierDetailModalOpen}
          onClose={handleCloseDossierDetail}
          dossier={selectedDossier}
        />
      )}
    </div>
  );
};