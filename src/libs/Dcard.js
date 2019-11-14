const Dcard = {
    debounce: (fun, delay = 500) => {

        let timer = null;

        return (...args) => {

            clearTimeout(timer);
            timer = setTimeout(() => {

                fun(...args);

            }, delay);

        };

    },
    throttle: (fun, delay = 200) => {

        let timer = null,
            last;

        return (...args) => {

            const now = new Date().getTime();

            if (last &&
                now - last > delay
            ) {

                if (timer) {

                    clearTimeout(timer);
                    timer = null;

                }
                timer = setTimeout(() => {

                    fun(...args);

                }, delay);

            }
            else {

                last = now;
                fun(...args);

            }

        };

    }
};

export default Dcard;
