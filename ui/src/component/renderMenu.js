import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import menuItems from "../router/routes";
import React from "react";

const {SubMenu} = Menu;

const renderChild = (item) => {
    return item.children.map((child) => {
        return renderItem(child);
    });
};

const renderIcon = (iconType) => {
    if (iconType != null) {
        return (
            <Icon type={iconType}/>
        )
    }
};

const renderItem = (item) => {
    if (!item.hidden) {
        if (item.children == null || item.children.length === 0) {
            return (
                <Menu.Item
                    key={item.key}
                    theme={"dark"}
                >
                    <Link to={item.component !== null ? item.key : '#'}>
                        {renderIcon(item.iconType)}
                        <span>{item.name}</span>
                    </Link>
                </Menu.Item>
            );
        } else {
            return (
                <SubMenu
                    key={item.key}
                    theme={"dark"}
                    title={
                        <span>
                        {renderIcon(item.iconType)}
                            <span>{item.name}</span>
                    </span>
                    }
                >
                    {
                        renderChild(item)
                    }
                </SubMenu>
            );
        }
    }
};

const renderMenu = () => {
    let itemSidebars = menuItems();
    return itemSidebars.map((item, index) => {
        return renderItem(item, index);
    });
};

export default renderMenu;
