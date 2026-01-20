import { useState, useEffect, useCallback } from 'react';
import financeApi from '../api/financeApi';

const useFinanceData = (tipo) => {
    const [data, setData] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('mes');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 7));
    const [editando, setEditando] = useState(null);

    const [modalConfig, setModalConfig] = useState({ show: false, id: null });

    const fetchData = useCallback(async () => {
        if (!fechaSeleccionada) return;
        try {
            const query = `filtro=${tipoFiltro}&fechaSeleccionada=${fechaSeleccionada}`;
            const response = await financeApi.get(`/${tipo}?${query}`);
            setData(response.data);
        } catch (error) {
            console.error(`Error al cargar ${tipo}`, error);
        }
    }, [tipo, tipoFiltro, fechaSeleccionada]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleTipoFiltroChange = (nuevoTipo) => {
        setTipoFiltro(nuevoTipo);
        const hoy = new Date();
        if (nuevoTipo === 'mes') setFechaSeleccionada(hoy.toISOString().slice(0, 7));
        else if (nuevoTipo === 'año') setFechaSeleccionada(hoy.getFullYear().toString());
        else setFechaSeleccionada(hoy.toISOString().split('T')[0]);
    };

    const handleDeleteClick = (id) => {
        setModalConfig({ show: true, id });
    };

    const confirmDelete = async () => {
        try {
            await financeApi.delete(`/${tipo}/${modalConfig.id}`);
            setModalConfig({ show: false, id: null });
            fetchData();
        } catch (error) {
            console.error("No se pudo eliminar", error);
        }
    };

    const handleImportJson = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonDatos = JSON.parse(event.target.result);
                await financeApi.post('/import-json', {
                    tipo: tipo === 'gastos' ? 'gasto' : 'venta',
                    datos: jsonDatos
                });
                fetchData();
            } catch (error) {
                console.error("Error en formato JSON");
            }
        };
        reader.readAsText(file);
    };

    return {
        data,
        tipoFiltro,
        fechaSeleccionada,
        setFechaSeleccionada,
        editando,
        setEditando,
        modalConfig,
        setModalConfig,
        handleTipoFiltroChange,
        handleDeleteClick,
        confirmDelete,
        handleImportJson,
        refresh: fetchData
    };
};

export default useFinanceData;