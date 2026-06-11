import { BANNER_CONTENT } from "@/constants/banner";

const FeatureBanner = () => {
  return (
    <div className="flex items-center justify-center gap-12 text-white">
      {BANNER_CONTENT.map(({ icon, label, id }) => {
        return (
          <div className="flex flex-col items-center gap-3" key={`${id}-banner`}>
            <img
              src={icon}
              alt={label}
              className="w-18 h-10 object-contain pointer-events-none"
            />
            <span className="font-bold text-[16px] tracking-wide">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  )
}

export default FeatureBanner;