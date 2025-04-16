import { createBrowserRouter, Navigate, Params, RouterProvider } from 'react-router';
import CrossFadeContents from './my-lib/domain/view-transition/crossFadePage/CrossFadeContents';
import * as Pages from './my-lib/pages/index';

const router = createBrowserRouter([
    {
        path: '',
        element: <Pages.Main />,
        children: [
            {
                path: 'view-transition',
                children: [
                    {
                        path: 'cross-fade',
                        element: <Pages.CrossFadePage />,
                        children: [
                            {
                                path: ':id',
                                element: <CrossFadeContents />,
                            },
                        ],
                    },
                    {
                        path: 'dynamic-card',
                        element: <div>dynamic-card</div>,
                    },
                    {
                        path: 'zoom-in-out',
                        element: <div>zoom-in-out</div>,
                    },
                ],
            },
            {
                path: 'dialog',
                children: [
                    {
                        path: 'showModal',
                        children: [
                            {
                                index: true,
                                element: <Navigate to="1" replace />,
                            },
                            {
                                path: ':id',
                                element: <Pages.ShowModalDialogPage />,
                            },
                        ],
                    },
                    {
                        path: 'alert',
                        children: [
                            {
                                index: true,
                                element: <Navigate to="1" replace />,
                            },
                            {
                                path: ':id',
                                element: <Pages.AlertDialogPage />,
                            },
                        ],
                    },
                    {
                        path: 'mobile',
                        children: [
                            {
                                index: true,
                                element: <Navigate to="1" replace />,
                            },
                            {
                                path: ':id',
                                element: <Pages.MobileDialogPage />,
                            },
                        ],
                    },
                    {
                        path: 'popover',
                        children: [
                            {
                                index: true,
                                element: <Navigate to="1" replace />,
                            },
                            {
                                path: ':id',
                                element: <Pages.PopoverPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
