export default function authorization (authorization: string | undefined): Promise<void> {

    return new Promise((resolve, reject) => {
        if (authorization === undefined) {
            reject();
            return;
        }

        const auth = Buffer.from(authorization.split(' ')[1],'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];

        if (!(user === 'admin!' && pass === 'admin')) {
            reject();
            return;
        }

        resolve();

    });
}
