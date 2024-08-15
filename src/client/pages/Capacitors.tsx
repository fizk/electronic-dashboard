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
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['capacitors-ceramic'], data.previous)
                }
            });
        },
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/ceramic/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            const previous = queryClient.getQueryData(['capacitors-ceramic']);
            queryClient.setQueryData(['capacitors-ceramic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
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
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/electrolytic/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            const previous = queryClient.getQueryData(['capacitors-electrolytic']);
            queryClient.setQueryData(['capacitors-electrolytic'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
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
        mutationFn: async (item: CapacitorValue): Promise<any>  => {
            const formData = new FormData();
            formData.set('active', String(item.active ? 0 : 1));

            const response = await fetch(`/electronic/api/values/capacitors/film/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            const previous = queryClient.getQueryData(['capacitors-film']);
            queryClient.setQueryData(['capacitors-film'], (old: CapacitorValue[]) => (
                old.map((i: CapacitorValue) => (
                    i.id === item.id ? {...i, active: (item.active ? false : true)} : i
                ))
            ));

            return {previous, response};
        },
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
        <>
            <section className="capacitors-page__section capacitors-page__converter">
                <Section>
                    <h2>Converter</h2>
                    <CapacitorConverter />
                </Section>
            </section>
            <section className="capacitors-page__section capacitors-page__calculator">
                <h2>Codes</h2>
                <CapacitorCodeCalculator />
            </section>
            <section className="capacitors-page__section capacitors-page__values">
                <Tab>
                    <TabItem title={<span className="capacitors-page__tab-link"><CeramicCapacitor />Ceramic</span>} path="ceramic">
                        <CapacitorValueList format={(item) => (
                            <>
                                {item.micro >= 0.000001 && item.micro < 0.0001 && (
                                    <>
                                        <strong>{item.pico_value}</strong>
                                        <small>{item.nano_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.0001 && item.micro < 0.001 && (
                                    <>
                                        <strong>{item.nano_value}</strong>
                                        <small>{item.pico_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.001 && item.micro < 0.01 && (
                                    <>
                                        <strong>{item.nano_value}</strong>
                                        <small>{item.micro_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.01 && item.micro < 10 && (
                                    <>
                                        <strong>{item.micro_value}</strong>
                                        <small>{item.nano_value}</small>
                                    </>
                                )}

                                {item.micro >= 10 && (
                                    <>
                                        <strong>{item.micro_value}</strong>
                                    </>
                                )}
                            </>
                        )} values={ceramicCapacitors.data || []} onSelect={updateCeramic.mutate} 
                            onAdd={item => handleAddToWantlist(item, 'Ceramic')} />
                    </TabItem>
                    <TabItem title={<span className="capacitors-page__tab-link"><FilmCapacitor/>Film</span>} path="film">
                        <CapacitorValueList format={item => (
                            <>

                                {item.micro >= 0.000001 && item.micro < 0.0001 && (
                                    <>
                                        <strong>{item.pico_value}</strong>
                                        <small>{item.nano_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.0001 && item.micro < 0.001 && (
                                    <>
                                        <strong>{item.nano_value}</strong>
                                        <small>{item.pico_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.001 && item.micro < 0.01 && (
                                    <>
                                        <strong>{item.nano_value}</strong>
                                        <small>{item.micro_value}</small>
                                    </>
                                )}

                                {item.micro >= 0.01 && item.micro < 10 && (
                                    <>
                                        <strong>{item.micro_value}</strong>
                                        <small>{item.nano_value}</small>
                                    </>
                                )}

                                {item.micro >= 10 && (
                                    <>
                                        <strong>{item.micro_value}</strong>
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
        </>
    )
}
