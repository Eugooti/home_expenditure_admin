import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {  BellIcon } from '@heroicons/react/24/outline'
import logo from "../../assets/Images/logo2.png"
import Dp from "../../assets/Images/team-1.jpg"
import {Link} from "react-router-dom";
import {logout} from "../../Views/Pages/Authentication/Auth.js";
import {SettingOutlined,ProfileOutlined,LogoutOutlined} from "@ant-design/icons";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {() => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-start justify-start sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-start">
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={Dp}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute bg-gray-800 right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/team"
                                                        className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-white')}
                                                    >
                                                        <ProfileOutlined/> Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/audio"
                                                        className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-white')}
                                                    >
                                                        <SettingOutlined/> Settings
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        // to="/videos"
                                                        onClick={logout}
                                                        className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-white')}
                                                    >
                                                        <LogoutOutlined/> Sign out
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </Disclosure>
    )
}
