import { Fragment, useState, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/', current: true }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { authProfile, handleSignOut, isLoggedIn } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-yellow-700 w-full relative top-0 backdrop-blur-3xl">
      {({ open }) => (
        <>
          <div className="w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center"> 
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=400"
                    alt="Blog P"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=400"
                    alt="Blog P"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white ',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              { isLoggedIn ? (
                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                 <Link to='/create-new-blog' type='button' className='bg-gray-800 px-3 py-2 rounded-md text-sm text-white font-medium'>
                     Write 
                 </Link>
                 {/* Profile dropdown */}
                 <Menu as="div" className="relative ml-3">
                   <div>
                     <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                       <span className="sr-only">Open user menu</span>
                       <img
                         className="h-8 w-8 rounded-full"
                         src="https://media.istockphoto.com/id/1368264124/photo/extreme-close-up-of-thrashing-emerald-ocean-waves.jpg?b=1&s=170667a&w=0&k=20&c=qha_PaU54cu9QCu1UTlORP4-sW0MqLGERkdFKmC06lI="
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
                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                       <Menu.Item>
                         {({ active }) => (
                           <Link
                             to="/profile"
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                             Your Profile
                           </Link>
                         )}
                       </Menu.Item>
                       <Menu.Item>
                         {({ active }) => (
                           <p
                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-left text-sm text-gray-700 cursor-pointer')}
                             onClick={handleSignOut}
                           >
                             Sign out
                           </p>
                         )}
                       </Menu.Item>
                     </Menu.Items>
                   </Transition>
                 </Menu>
               </div>
           
              ) : (
                <div className='flex'>
                  <Link to='/signin' className="sm:block hidden rounded-full border border-transparent bg-yellow-600 py-2 px-7 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none">Sign in</Link>
                  <Link to='/signup' className="sm:block hidden rounded-full ml-4 border border-transparent bg-gray-100 py-2 px-7 text-sm font-medium text-yellow-600 hover:bg-gray-300 focus:outline-none">Sign up</Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white ',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
