export async function randomDelayBetweenInSeconds(minimumSeconds = 300, maximumSeconds = 600) { 
    //Default Random delay between 5 to 10 minutes
    console.log('Delaying randomly');
    const minimum = minimumSeconds * 1000;
    const maximum = maximumSeconds * 1000;
    const delay = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
    return new Promise(resolve => setTimeout(resolve, delay));
}
