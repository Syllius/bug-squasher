import React from "react";
import "./MenuItem.scss";

interface Props {
    itemClassName: string;
    itemName: string;
    onMenuItemClick: () => any;
}

export const MenuItem: React.FC<Props> = ({
    itemClassName, itemName, onMenuItemClick
}: Props) => {
    return (
        <div
            className={`menu-item menu-item-${itemClassName}`}
            onClick={onMenuItemClick}
        >
            <h2>{itemName}</h2>
        </div>
    );
};