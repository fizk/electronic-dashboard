import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tab, TabItem } from '../elements/Tab';
import { Section } from '../elements/Section';
import ToggleableValueItem, { capacitorLabelFormatter, capacitorValueFormat } from '../elements/ToggleableValueItem';
import CapacitorCodeCalculator from '../converters/CapacitorCodeCalculator';
import { Loading } from '../icons/Loading';
import CeramicCapacitor from '../icons/CeramicCapacitor';
import FilmCapacitor from '../icons/FilmCapacitor';
import ElectrolyticCapacitor from '../icons/ElectrolyticCapacitor';
import type { CapacitorValue } from '../types.d';
import './Capacitors.css';


type MutationArgs = {
    item: CapacitorValue, 
    form: FormData
}

export default function Capacitors () {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient()
    const filmCapacitors = useQuery({ queryKey: ['capacitors-film'], queryFn: async(): Promise<CapacitorValue[]> => {
        const request = await fetch('/electronic/api/values/capacitors/film');
        const response = request.json();
        return response;
    } });

    const electrolyticCapacitors = useQuery({ queryKey: ['capacitors-electrolytic'], queryFn: async(): Promise<CapacitorValue[]> => {
        const request = await fetch('/electronic/api/values/capacitors/electrolytic');
        const response = request.json();
        return response;
    } });

    const ceramicCapacitors = useQuery({ queryKey: ['capacitors-ceramic'], queryFn: async(): Promise<CapacitorValue[]> => {
        const request = await fetch('/electronic/api/values/capacitors/ceramic');
        const response = request.json();
        return response;
    } });

    const updateCeramic = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['capacitors-ceramic'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgs): Promise<any>  => {
            const response = await fetch(`/electronic/api/values/capacitors/ceramic/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['capacitors-ceramic']);
            queryClient.setQueryData(['capacitors-ceramic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        },
    });

    const updateElectrolytic = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['capacitors-electrolytic'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgs): Promise<any>  => {
            const response = await fetch(`/electronic/api/values/capacitors/electrolytic/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['capacitors-electrolytic']);
            queryClient.setQueryData(['capacitors-electrolytic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        },
    });

    const updateFilm = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['capacitors-film'], data.previous)
                }
            });
        },
        mutationFn: async ({item, form}: MutationArgs): Promise<any>  => {
            const response = await fetch(`/electronic/api/values/capacitors/film/${item.id}`, {
                method: 'PATCH',
                body: form
            });

            const previous = queryClient.getQueryData(['capacitors-film']);
            queryClient.setQueryData(['capacitors-film'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? item : i
                ))
            ));

            return {previous, response};
        },
    });

    const handleSaveCeramic = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('notes', item.notes as string)
        updateCeramic.mutate({item, form});
    }

    const handleStatusCeramic = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));
        updateCeramic.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    }

    const handleSaveElectrolytic = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('notes', item.notes as string)
        updateElectrolytic.mutate({item, form});
    }

    const handleStatusElectrolytic = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));
        updateElectrolytic.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    }

    const handleSaveFilm = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('notes', item.notes as string)
        updateFilm.mutate({item, form});
    }

    const handleStatusFilm = (item: CapacitorValue) => {
        const form = new FormData();
        form.set('active', String(item.active ? 0 : 1));
        updateFilm.mutate({
            item: {...item, active: !item.active}, 
            form
        });
    }

    const handleAddToWantlist = (type: string) => async (item: CapacitorValue) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', `${type} capacitor ${item.pico_value} - ${item.micro_value}`);
        
        await fetch(`/electronic/api/wantlist`, {
            method: 'POST',
            body: formData
        });

        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <>
            <article className="capacitors-page">
                <header className="capacitors-page__header">
                    <h1 className="capacitors-page__title">Capacitors</h1>
                </header>
                <aside>
                    <Section variant={['raised', 'framed']}>
                        <h2 className="capacitors-page__title">Code converter</h2>
                        <h3>3 Digit EIA</h3>
                        <CapacitorCodeCalculator />
                    </Section>
                </aside>
                <section>
                    <Tab>
                        <TabItem title={<span className="capacitors-page__tab-link"><CeramicCapacitor />Ceramic</span>} path="ceramic">
                            <ul className="capacitors-page__value-list">
                                {ceramicCapacitors.data?.map(item => (
                                    <li className="capacitors-page__value-item" key={`ceramic${item.id}`}>
                                        <ToggleableValueItem item={item} 
                                            onUpdate={handleSaveCeramic}
                                            onSelect={handleStatusCeramic} 
                                            onAdd={handleAddToWantlist('Ceramic')}
                                            formatLabel={capacitorLabelFormatter}
                                            formatValue={capacitorValueFormat}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </TabItem>
                        <TabItem title={<span className="capacitors-page__tab-link"><FilmCapacitor/>Film</span>} path="film">
                            <ul className="capacitors-page__value-list">
                                {filmCapacitors.data?.map(item => (
                                    <li className="capacitors-page__value-item" key={`film${item.id}`}>
                                        <ToggleableValueItem item={item} 
                                            onSelect={handleStatusFilm} 
                                            onUpdate={handleSaveFilm}
                                            onAdd={handleAddToWantlist('Film')}
                                            formatLabel={capacitorLabelFormatter}
                                            formatValue={capacitorValueFormat}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </TabItem>
                        <TabItem title={<span className="capacitors-page__tab-link"><ElectrolyticCapacitor />Electrolytic</span>} path="electrolytic">
                            <ul className="capacitors-page__value-list">
                                {electrolyticCapacitors.data?.map(item => (
                                    <li className="capacitors-page__value-item" key={`electro${item.id}`}>
                                        <ToggleableValueItem item={item} 
                                            onSelect={handleSaveElectrolytic} 
                                            onUpdate={handleStatusElectrolytic}
                                            onAdd={handleAddToWantlist('Electrolytic')}
                                            formatLabel={capacitorLabelFormatter}
                                            formatValue={capacitorValueFormat}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </TabItem>
                    </Tab>
                </section>
            </article>
            {loading && (
                <footer className='capacitors-page__footer'>
                    <Loading />
                </footer>
            )}
        </>
    )
}
