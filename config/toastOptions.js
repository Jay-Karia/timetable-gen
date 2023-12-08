const success = {
    style: {
        border: "1px solid #022a09",
        color: "#054b11",
    },
    iconTheme: {
        primary: "#054b11",
        secondary: "#FFFAEE",
    },
}

const error = {
    style: {
        border: "1px solid #2a0202",
        color: "#9b1515",
    },
    iconTheme: {
        primary: "#9b1515",
        secondary: "#FFFAEE",
    },
}

const loading = {
    icon: "⭕",
    style: {
        border: "1px solid #713200",
        color: "#713200",
    },
    iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
    },
}

const toastOptions = {
    success,
    error,
    loading,
}

export default toastOptions