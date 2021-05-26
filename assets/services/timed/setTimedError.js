export function setTimedError(msg, time = 5000) {
    this.setState({ errorMessage: msg });
    setTimeout(() => {
        this.setState({ errorMessage: "" });
    }, time);
}