import React, { 
    ReactNode, 
    type HTMLAttributes, 
    type TdHTMLAttributes,
} from "react";
import classVariant from '../helpers/classVariant';
import './Table.css';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children?: ReactNode
    variants?: ('full' | 'stick')[]
}
export function Table ({children, variants = [], ...attr}: TableProps) {
    return (<table {...attr} className={classVariant('table', variants)}>{children}</table>)
}

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode
    variants?: []
}
export function TableHeader ({children, variants = [], ...attr}: TableHeaderProps) {
    return (<thead {...attr} className={classVariant('table__head', variants)}>{children}</thead>)
}

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode
    variants?: []
}
export function TableBody ({children, variants = [], ...attr}: TableBodyProps) {
    return (<tbody {...attr} className={classVariant('table__body', variants)}>{children}</tbody>)
}

interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode
    variants?: []
}
export function TableFooter ({children, variants = [], ...attr}: TableFooterProps) {
    return (<tfoot {...attr} className={classVariant('table__foot', variants)}>{children}</tfoot>)
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children?: ReactNode
    variants?: []
}
export function TableRow ({children, variants = [], ...attr}: TableRowProps) {
    return (<tr {...attr} className={classVariant('table__row', variants)}>{children}</tr>)
}

interface TableColumnProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode
    variants?: ('active' | 'begin' | 'end' | 'numeric')[]
}
export function TableColumn ({children, variants = [], ...attr}: TableColumnProps) {
    return (<td {...attr} className={classVariant('table__data', variants)}>{children}</td>)
}
