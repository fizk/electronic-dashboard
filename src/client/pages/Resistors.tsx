import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ResistorCodeCalculator from '../components/ResistorCodeCalculator';
import ResistorValueList from '../components/ResistorValueList';
import { Section } from '../elements/Section';
import type { ValueItemEntry } from '../types.d';
import './Resistors.css';


export default () => {
    const queryClient = useQueryClient()
    const query = useQuery({ queryKey: ['resistors'], queryFn: async(): Promise<ValueItemEntry[]> => {
        const request = await fetch('/electronic/api/values/resistors');
        const response = request.json();
        return response;
    } });

    const updateMutation = useMutation({
        mutationFn: async (item: ValueItemEntry): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/resistors/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            queryClient.setQueryData(['resistors'], (old: ValueItemEntry[]) => (
                old.map((i: ValueItemEntry) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
                ))
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });

    const handleCheck = (item: ValueItemEntry) => {
        updateMutation.mutate(item);
    }

    const handleAddToWantlist = async (item: ValueItemEntry) => {
        const formData = new FormData();
        formData.append('name', `Resistor ${item.text}`);
        
        await fetch(`/electronic/api/wantlist`, {
            method: 'POST',
            body: formData
        })
    };
    
    return (
        <article className="resistors-page">
            <header className="resistors-page__header">
                <h1>Resistors</h1>
            </header>
            <section className="resistors-page__section">
                <Section>
                    <header><h2>3 Digit EIA</h2></header>
                    <ResistorCodeCalculator />
                </Section>
            </section>
            <section className="resistors-page__section">
                <Section>
                    <header><h2>E24 values (5% tolerance)</h2></header>
                    <ResistorValueList values={query.data || []} 
                        onSelect={handleCheck} 
                        onAdd={handleAddToWantlist} />
                </Section>
            </section>
        </article>
    )
}
