import { BENEFITS } from "@/constants/footerLinks";
import tick from "@assets/tick.svg";

const Benefits = () => {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <ul className="space-y-2.5 m-auto px-6 list-none p-0" aria-label="Benefits">
        {BENEFITS.map((benefit, index) => (
          <li
            key={benefit}
            className="flex items-center gap-4 text-muted bg-linen p-2 rounded-[10px] opacity-1 animate-slide-up [animation-fill-mode:forwards]"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-white rounded-md p-3 flex items-center justify-center" aria-hidden="true">
              <img src={tick} alt="" className="w-7 h-6" />
            </div>

            <div className="flex-1 pr-2">
              <p className="text-[15px] font-bold text-muted leading-5">
                {benefit}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;