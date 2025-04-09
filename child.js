process.on('message', (count) => {
    console.log('Count received in child: ',count);
    process.send({isPrime: isPrime(count)});
})

const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i<= Math.sqrt(n); i++) {
        if(n%i === 0) return false;
    }
    return true;
}