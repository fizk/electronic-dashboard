import React, {useState} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tab, TabItem } from '../elements/Tab';
import { Section } from '../elements/Section';
import CapacitorConverter from '../components/CapacitorConverter';
import CapacitorCodeCalculator from "../components/CapacitorCodeCalculator";
import CapacitorValueList from '../components/CapacitorValueList';
import { Loading } from '../icons/Loading';
import CeramicCapacitor from '../icons/CeramicCapacitor';
import FilmCapacitor from '../icons/FilmCapacitor';
import ElectrolyticCapacitor from '../icons/ElectrolyticCapacitor';
import type { CapacitorValue } from '../types.d';
import './Capacitors.css';

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
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/ceramic/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            queryClient.setQueryData(['capacitors-ceramic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
                ))
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });

    const updateElectrolytic = useMutation({
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/electrolytic/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            queryClient.setQueryData(['capacitors-electrolytic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
                ))
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });

    const updateFilm = useMutation({
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/film/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            queryClient.setQueryData(['capacitors-film'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
                ))
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });

    const handleAddToWantlist = async (item: CapacitorValue, type: string) => {
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
        <article className="capacitors-page">
            <header className="capacitors-page__header">
                <h1>Capacitors</h1>
            </header>
            <section className="capacitors-page__section capacitors-page__converter">
                <Section>
                    <header><h2>Converter</h2></header>
                    <CapacitorConverter />
                </Section>
            </section>
            <section className="capacitors-page__section capacitors-page__calculator">
                <header><h2>Codes</h2></header>
                <CapacitorCodeCalculator />
            </section>
            <section className="capacitors-page__section capacitors-page__values">
                <Tab>
                    <TabItem title={<span className="capacitors-page__tab-link"><CeramicCapacitor />Ceramic</span>} path="ceramic">
                        <CapacitorValueList format={(item) => (
                            <>
                                {item.micro >= 0.1 && (
                                    <strong>{item.micro_value}</strong>
                                )}
                                {item.micro < 0.1 && (
                                    <>
                                    <strong>{item.pico_value}</strong>
                                    {item.micro >= 0.001 && <small>{item.micro_value}</small>}
                                    </>

                                )}
                            </>
                        )} values={ceramicCapacitors.data || []} onSelect={updateCeramic.mutate} 
                            onAdd={item => handleAddToWantlist(item, 'Ceramic')} />
                    </TabItem>
                    <TabItem title={<span className="capacitors-page__tab-link"><FilmCapacitor/>Film</span>} path="film">
                        <CapacitorValueList format={item => (
                            <>
                                {item.micro >= 0.1 && (
                                    <strong>{item.micro_value}</strong>
                                )}
                                {item.micro < 0.1 && (
                                    <>
                                    <strong>{item.pico_value}</strong>
                                    {item.micro >= 0.001 && <small>{item.micro_value}</small>}
                                    </>
                                )}
                            </>
                        )} values={filmCapacitors.data || []} onSelect={updateFilm.mutate} 
                            onAdd={item => handleAddToWantlist(item, 'Film')} />
                    </TabItem>
                    <TabItem title={<span className="capacitors-page__tab-link"><ElectrolyticCapacitor />Electrolytic</span>} path="electrolytic">
                        <CapacitorValueList format={item => (
                            <strong>{item.micro_value}</strong>
                        )} values={electrolyticCapacitors.data || []} onSelect={updateElectrolytic.mutate} 
                            onAdd={item => handleAddToWantlist(item, 'Electrolytic')} />
                    </TabItem>
                </Tab>
            </section>
            {loading && (
                <footer className='capacitors-page__footer'>
                    <Loading />
                </footer>
            )}
        </article>
    )
}
