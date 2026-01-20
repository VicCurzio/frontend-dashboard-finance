import { useState } from 'react';
import financeApi from '../api/financeApi';

export const useFinanceForm = (endpoint, onSuccess) => {
    const initialForm = {
        fecha: new Date().toISOString().split('T')[0],
        categoria: '',
        monto: '',
        descripcion: ''
    };

    const [formData, setFormData] = useState(initialForm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await financeApi.post(endpoint, formData);
            onSuccess();
            setFormData({ ...initialForm, categoria: '', monto: '', descripcion: '' });
        } catch (error) {
            alert("Error al procesar la solicitud");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return { formData, handleChange, handleSubmit, setFormData };
};