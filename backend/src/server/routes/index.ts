import { Router } from "express";
import createHttpError from "http-errors";
import v1 from './v1';

const router = Router();

const apiVersions: { [version: string]: Router } = {
    v1,
};

for (const version in apiVersions) {
    if (Object.prototype.hasOwnProperty.call(apiVersions, version)) {
        const apiVersion = apiVersions[version];

        router.use(`/${version}`, apiVersion);

        router.use(`/${version}`, (req, res, next) => {
            return next(createHttpError(404, `API ${version}: Route ${req.originalUrl} not found.`));
        })
    }
}

router.use('/:apiVersion', (req, res, next) => {
    const { apiVersion } = req.params;

    return next(createHttpError(404, `API version ${apiVersion} not found.`));
});

export default router;