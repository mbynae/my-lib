import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import express from 'express';
import dayjs from 'dayjs';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        {
            name: 'custom-api',
            configureServer(server) {
                const app = express();

                app.get('/api/example', (req, res) => {
                    const id = req.query.id;

                    res.setHeader('Content-Type', 'application/json; charset=utf-8');

                    if (id === '예시') {
                        res.status(200).json({
                            msg: 'OK',
                            msgcode: 1,
                            path: '/api/example',
                            createtime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                            status: 200,
                            responsetype: 'application/json',
                            obj_data: null,
                            message: `아이디 ${id}로 접속했습니다.`,
                        });
                    } else {
                        res.status(400).json({
                            msg: 'ERROR',
                            msgcode: -1,
                            path: '/api/example',
                            createtime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                            status: 400,
                            responsetype: 'application/json',
                            errorslist: [],
                            mainerror: {
                                msg: '로그인을 진행해주세요.',
                                errorcode: 'ERRORCODE0001',
                            },
                        });
                    }
                });

                app.use(express.json());
                app.post('/api/post', (req, res) => {
                    if (req.body.id === '예시') {
                        res.status(200).json({
                            msg: 'OK',
                            msgcode: 1,
                            path: '/api/example',
                            // createtime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                            createtime: new Date().toISOString(),
                            status: 200,
                            responsetype: 'application/json',
                            obj_data: null,
                            message: `아이디 ${req.body.id}의 로그인에 성공했습니다.`,
                        });
                        return;
                    }
                    if (req.body.id && req.body.id !== '예시') {
                        res.status(200).json({
                            msg: 'ERROR',
                            msgcode: -1,
                            path: '/api/example',
                            createtime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                            status: 401,
                            responsetype: 'application/json',
                            errorslist: [],
                            mainerror: {
                                msg: '인가된 사용자가 아닙니다.',
                                errorcode: 'ERRORCODE0001',
                            },
                        });
                        return;
                    }
                    res.status(400).json({
                        msg: 'ERROR',
                        msgcode: -1,
                        path: '/api/example',
                        createtime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                        status: 400,
                        responsetype: 'application/json',
                        errorslist: [],
                        mainerror: {
                            msg: '아이디 혹은 패스워드를 입력해주세요.',
                            errorcode: 'ERRORCODE0001',
                        },
                    });
                });

                server.middlewares.use(app);
            },
        },
    ],
    server: {
        port: 3000,
    },
});
