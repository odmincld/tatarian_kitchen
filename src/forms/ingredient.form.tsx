'use client';

import React, { ChangeEvent, FC, useState, useTransition } from 'react';
import { Button, Form, Input, Select, SelectItem } from '@heroui/react';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { Textarea } from '@heroui/input';
import toast, { Toaster } from 'react-hot-toast';
import { useIngredientStore } from '@/store/ingredient.store';

const LABEL_STYLES = "text-medium text-black after:content-['']";
const INPUT_STYLES = {
  inputWrapper: 'bg-default-100',
  input: 'text-medium focus:outline-none',
  label: LABEL_STYLES,
};
const VALIDATE_MESSAGES = {
  name: 'Name is Required',
  pricePerUnit: 'Price is Required',
};

const initialState = {
  name: '',
  category: '',
  unit: '',
  pricePerUnit: '',
  description: '',
};

const IngredientForm: FC = () => {
  const [formData, setFormData] = useState(initialState);
  const { addIngredient } = useIngredientStore();
  const [isPending, startTransition] = useTransition();

  const handlerSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await addIngredient(formData);

      const storeError = useIngredientStore.getState().error;

      if (storeError) {
        toast.error('Error adding ingredient');
      } else {
        setFormData(initialState);
        toast.success('Ingredient added!');
      }
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validators: Record<string, (val: string) => string | null> = {
    name: (val) => (!val ? VALIDATE_MESSAGES.name : null),
    pricePerUnit: (val) => (!val ? VALIDATE_MESSAGES.pricePerUnit : null),
  };

  return (
    <Form className="w-full gap-3" action={handlerSubmit}>
      <Input
        isRequired
        label="Name Ingredient"
        labelPlacement="inside"
        name="name"
        type="text"
        value={formData.name}
        classNames={INPUT_STYLES}
        onChange={handleChange}
        validate={validators.name}
      />

      <div className="grid grid-cols-3 w-full gap-2">
        <Select
          isRequired
          label="Category"
          labelPlacement="inside"
          name="category"
          selectedKeys={formData.category ? [formData.category] : []}
          classNames={{ label: LABEL_STYLES }}
          onChange={handleChange}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              classNames={{ title: 'text-black text-medium' }}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          isRequired
          label="Unit"
          labelPlacement="inside"
          name="unit"
          selectedKeys={formData.unit ? [formData.unit] : []}
          classNames={{ label: LABEL_STYLES }}
          onChange={handleChange}
        >
          {UNIT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              classNames={{ title: 'text-black text-medium' }}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Price"
          labelPlacement="inside"
          name="pricePerUnit"
          type="number"
          value={formData.pricePerUnit}
          classNames={INPUT_STYLES}
          onChange={handleChange}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-black text-medium">$</span>
            </div>
          }
        />
      </div>

      <Textarea
        label="Description (Not Required)"
        labelPlacement="inside"
        name="description"
        type="text"
        value={formData.description}
        classNames={INPUT_STYLES}
        onChange={handleChange}
      />

      <div className="flex w-full  h-[50px] justify-end relative">
        <Toaster position="top-center" />

        <Button
          isLoading={isPending}
          color={'primary'}
          type="submit"
          className="h-[50px]"
        >
          Add Ingredient
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
