import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { mockCountries } from '../../data/mockData';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  activeIngredient: string;
  pharmaceuticalForm: string;
  concentration: string;
  manufacturerName: string;
  therapeuticClass: string;
  atcCode: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: product ? {
      name: product.name,
      activeIngredient: product.activeIngredient,
      pharmaceuticalForm: product.pharmaceuticalForm,
      concentration: product.concentration,
      manufacturerName: product.manufacturerName,
      therapeuticClass: product.therapeuticClass,
      atcCode: product.atcCode
    } : {}
  });
  
  const pharmaceuticalForms = [
    { value: 'comprimidos', label: 'Comprimidos' },
    { value: 'capsulas', label: 'Cápsulas' },
    { value: 'capsulas_blandas', label: 'Cápsulas blandas' },
    { value: 'comprimidos_recubiertos', label: 'Comprimidos recubiertos' },
    { value: 'jarabe', label: 'Jarabe' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'inyectable', label: 'Inyectable' },
    { value: 'crema', label: 'Crema' },
    { value: 'pomada', label: 'Pomada' },
    { value: 'gel', label: 'Gel' }
  ];
  
  const therapeuticClasses = [
    { value: 'analgesicos', label: 'Analgésicos y Antipiréticos' },
    { value: 'antibioticos', label: 'Antibióticos betalactámicos' },
    { value: 'antiinflamatorios', label: 'Antiinflamatorios no esteroideos' },
    { value: 'cardiovasculares', label: 'Cardiovasculares' },
    { value: 'digestivos', label: 'Digestivos y metabolismo' },
    { value: 'respiratorios', label: 'Sistema respiratorio' },
    { value: 'neurologicos', label: 'Sistema nervioso' }
  ];
  
  const onFormSubmit = (data: FormData) => {
    const productData: Partial<Product> = {
      ...data,
      manufacturerId: 'mfg-1', // Mock manufacturer ID
      status: product ? product.status : 'draft',
      updatedAt: new Date().toISOString(),
      ...(product ? {} : { 
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        registrations: []
      })
    };
    
    onSubmit(productData);
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre del Producto"
            placeholder="Ej: Paracetamol Plus 500mg"
            required
            {...register('name', { required: 'El nombre es requerido' })}
            error={errors.name?.message}
          />
          
          <Input
            label="Ingrediente Activo"
            placeholder="Ej: Paracetamol + Cafeína"
            required
            {...register('activeIngredient', { required: 'El ingrediente activo es requerido' })}
            error={errors.activeIngredient?.message}
          />
          
          <Select
            label="Forma Farmacéutica"
            placeholder="Seleccionar forma farmacéutica"
            required
            options={pharmaceuticalForms}
            {...register('pharmaceuticalForm', { required: 'La forma farmacéutica es requerida' })}
            error={errors.pharmaceuticalForm?.message}
          />
          
          <Input
            label="Concentración"
            placeholder="Ej: 500mg + 50mg"
            required
            {...register('concentration', { required: 'La concentración es requerida' })}
            error={errors.concentration?.message}
          />
          
          <Input
            label="Fabricante"
            placeholder="Ej: Laboratorios Farmex S.A."
            required
            {...register('manufacturerName', { required: 'El fabricante es requerido' })}
            error={errors.manufacturerName?.message}
          />
          
          <Select
            label="Clase Terapéutica"
            placeholder="Seleccionar clase terapéutica"
            required
            options={therapeuticClasses}
            {...register('therapeuticClass', { required: 'La clase terapéutica es requerida' })}
            error={errors.therapeuticClass?.message}
          />
        </div>
        
        <Input
          label="Código ATC"
          placeholder="Ej: N02BE51"
          {...register('atcCode')}
          error={errors.atcCode?.message}
        />
        
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {product ? 'Actualizar' : 'Crear'} Producto
          </Button>
        </div>
      </form>
    </Card>
  );
};