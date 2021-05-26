export function setTimedInfo(msg, time = 5000) {
    this.setState({ infoMessage: msg });
    setTimeout(() => {
        this.setState({ infoMessage: "" });
    }, time);
}