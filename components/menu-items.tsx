/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

type SubmenuType = {
  icon: React.ElementType;
  id: Key | null | undefined;
  label:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
};

type MenuItemType = {
  icon: React.ElementType;
  id: Key | null | undefined;
  label:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
  submenus?: SubmenuType[];
};

type MenuItemProps = {
  item: MenuItemType;
  activeMenu: Key | null | undefined;
  onClick: (id: Key | null | undefined) => void;
  isOpen: boolean;
  onToggle: (id: Key | null | undefined) => void;
  sidebarOpen: boolean;
};

export const MenuItem = ({
  item,
  activeMenu,
  onClick,
  isOpen,
  onToggle,
  sidebarOpen,
}: MenuItemProps) => {
  const Icon = item.icon;
  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const isActive =
    activeMenu === item.id ||
    (item.submenus &&
      item.submenus.some(
        (sub: SubmenuType) => activeMenu === sub.id
      ));

  if (!hasSubmenus) {
    return (
      <button
        onClick={() => onClick(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          activeMenu === item.id
            ? "bg-orange-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        <Icon size={20} />
        {sidebarOpen && (
          <span className="font-medium flex-1 text-left">{item.label}</span>
        )}
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() =>
          sidebarOpen ? onToggle(item.id) : onClick(item.submenus?.[0]?.id)
        }
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        <Icon size={20} />
        {sidebarOpen && (
          <>
            <span className="font-medium flex-1 text-left">{item.label}</span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </>
        )}
      </button>

      {sidebarOpen && isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {item.submenus?.map(
            (submenu: {
              icon: React.ElementType;
              id: Key | null | undefined;
              label:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => {
              const SubIcon = submenu.icon;
              return (
                <button
                  key={submenu.id}
                  onClick={() => onClick(submenu.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                    activeMenu === submenu.id
                      ? "bg-orange-600 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <SubIcon size={16} />
                  <span>{submenu.label}</span>
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};
