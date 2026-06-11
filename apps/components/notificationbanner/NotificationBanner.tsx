type NotificationBannerProps = {
    message: string;
}

const NotificationBanner = ({ message }: NotificationBannerProps) => {
    if (!message) return null;
    return (
        <div className="bg-header p-2 text-xs text-white text-center uppercase" role="alert">
            {message}
        </div>
    );
};

export default NotificationBanner;