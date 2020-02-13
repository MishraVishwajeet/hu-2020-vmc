import React from 'react';
export interface IButtonProps{
    title: string;
    onClick:(arg0: any)=>void;
    disabled?: boolean;
    type: string;
}