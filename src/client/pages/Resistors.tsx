import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from '../hooks/useLocalStorage';
import ResistorCodeCalculator from '../components/ResistorCodeCalculator';
import ResistorValueItem from '../components/ResistorValueItem';
import { Section } from '../elements/Section';
import { Loading } from '../icons/Loading';
import { Tab, TabItem } from '../elements/Tab';
import type { ResistorValue } from '../types.d';
import './Resistors.css';

interface MutationArgument {
    item: ResistorValue
    form: FormData
}

export default function Resistor() {
    const [threeDigitunit, setThreeDigitunit] = useLocalStorage ('3-digit-eia-unit', 1000);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const queryFixedResistors = useQuery({initialData: [], queryKey: ['resistors-fixed'], queryFn: async(): Promise<ResistorValue[]> => {
        const request = await fetch('/electronic/api/values/resistors/fixed');
        const response = request.json();
        return response;
    }});

    const queryVariableResistors = useQuery({initialData: [], queryKey: ['resistors-variable'], queryFn: async(): Promise<ResistorValue[]> => {
        const request = await fetch('/electronic/api/values/resistors/variable');
        const response = request.json();
        return response;
    }});

    const queryTrimResistors = useQuery({initialData: [], queryKey: ['resistors-trim'], queryFn: async(): Promise<ResistorValue[]> => {
        const request = await fetch('/electronic/api/values/resistors/trim');
        const response = request.json();
        return response;
    }});

    const fixedMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['resistors-fixed'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgument): Promise<any>  => {
            const response = fetch(`/electronic/api/values/resistors/fixed/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['resistors-fixed']);
            queryClient.setQueryData(['resistors-fixed'], (old: ResistorValue[]) => (
                old.map((i: ResistorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        }
    });

    const variableMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['resistors-variable'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgument): Promise<any>  => {
            const response = await fetch(`/electronic/api/values/resistors/variable/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['resistors-fixed']);
            queryClient.setQueryData(['resistors-variable'], (old: ResistorValue[]) => (
                old.map((i: ResistorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        },
    });

    const trimpodMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['resistors-trim'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgument): Promise<any>  => {
            const response = await fetch(`/electronic/api/values/resistors/trim/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['resistors-fixed']);
            queryClient.setQueryData(['resistors-trim'], (old: ResistorValue[]) => (
                old.map((i: ResistorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        },
    });

    const handleFixedActiveChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));

        fixedMutation.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    };

    const handleVariableActiveChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));

        variableMutation.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    };

    const handleTrimpodActiveChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));

        trimpodMutation.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    };

    const handleFixedNotesChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('notes', item.notes || '');

        fixedMutation.mutate({item, form});
    }

    const handleVariableNotesChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('notes', item.notes || '');

        variableMutation.mutate({item, form});
    }

    const handleTrimNotesChange = (item: ResistorValue) => {
        const form = new FormData();
        form.set('notes', item.notes || '');

        trimpodMutation.mutate({item, form});
    }

    const handleFixedToWantlist = async (item: ResistorValue) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', `Fixed resistor : ${item.text}`);

        await fetch(`/electronic/api/wantlist`, {
            method: 'POST',
            body: formData
        });

        setTimeout(() => setLoading(false), 1000);
    };

    const handleVariableToWantlist = async (item: ResistorValue) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', `Variable resistor : ${item.text}`);

        await fetch(`/electronic/api/wantlist`, {
            method: 'POST',
            body: formData
        });

        setTimeout(() => setLoading(false), 1000);
    };

    const handleTrimToWantlist = async (item: ResistorValue) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', `Trimpod resistor : ${item.text}`);

        await fetch(`/electronic/api/wantlist`, {
            method: 'POST',
            body: formData
        });

        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <article className="resistors-page">
            <header className="resistors-page__header">
                <h1>Resistors</h1>
            </header>
            <section className="resistors-page__section">
                <Section>
                    <h2>3 Digit EIA</h2>
                    <ResistorCodeCalculator defaultUnit={threeDigitunit} setDefaultUnit={setThreeDigitunit} />
                </Section>
            </section>
            <section className="resistors-page__section">
                <Tab>
                    <TabItem title="Fixed" path='fixed'>
                        <h3>Fixed E24 values (5% tolerance)</h3>
                        <ul className="resistors-page__items-list">
                            {queryFixedResistors.data.map(item => (
                                <li key={`fixed${item.id}`}>
                                    <ResistorValueItem value={item}
                                        onSelect={handleFixedActiveChange} 
                                        onAdd={handleFixedToWantlist}
                                        onUpdate={handleFixedNotesChange} />
                                </li>
                            ))}
                        </ul>
                    </TabItem>
                    <TabItem title="Variable" path='variable'>
                        <h3>Variable Resistors</h3>
                        <ul className="resistors-page__items-list">
                            {queryVariableResistors.data.map(item => (
                                <li key={`variable${item.id}`}>
                                    <ResistorValueItem value={item}
                                        onSelect={handleVariableActiveChange} 
                                        onAdd={handleVariableToWantlist} 
                                        onUpdate={handleVariableNotesChange} />
                                </li>
                            ))}
                        </ul>
                    </TabItem>
                    <TabItem title="Trimpods" path='trim'>
                        <h3>Trimpot Resistors</h3>
                        <ul className="resistors-page__items-list">
                            {queryTrimResistors.data.map(item => (
                                <li key={`trim${item.id}`}>
                                    <ResistorValueItem value={item}
                                        onSelect={handleTrimpodActiveChange} 
                                        onAdd={handleTrimToWantlist} 
                                        onUpdate={handleTrimNotesChange} />
                                </li>
                            ))}
                        </ul>
                    </TabItem>
                </Tab>
            </section>
            {loading && (
                <footer className='resistor-page__footer'>
                    <Loading />
                </footer>
            )}
        </article>
    )
}
