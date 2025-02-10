import { ReactNode } from "react";

type ErrorMessageProps = {
    children: ReactNode
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return (
        <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">
            {children}
        </p>
    );
}

export default ErrorMessage;
