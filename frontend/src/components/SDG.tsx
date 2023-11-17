type Props = {
  title?: string;
  content: string;
  children: any;
  reverse?: boolean;
};

const SDG = (props: Props) => {
  const SContent = () => {
    return (
      <>
        <div className="bg-pink-400 w-7/12 h-[720px] px-24 py-32 rounded-3xl">
          <div className="text-2xl leading-[2] py-4 w-10/12">
            <div className="font-bold text-4xl">
              {props.title || "Impact on Land"}
            </div>
            {props.content}
          </div>
        </div>
        <div className="bg-orange-200 w-5/12 h-[600px] -ml-10 order-1 rounded-3xl">
          {props.children}
        </div>
      </>
    );
  };

  const LinesSvg = () => {
    return (
      <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
        <svg
          className="w-16 h-auto text-red-500"
          width="121"
          height="135"
          viewBox="0 0 121 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
        </svg>
      </div>
    );
  };

  const LinesSvgReverse = () => {
    return (
      <div className="hidden absolute top-0 start-0 translate-x-20 md:block lg:-translate-x-20 lg:-rotate-180">
        <svg
          className="w-16 h-auto text-red-500"
          width="121"
          height="135"
          viewBox="0 0 121 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <section className="w-11/12 bg-base-200 p-4 rounded-2xl mx-auto my-10 lg:w-8/12 lg:bg-transparent lg:rounded-none lg:my-40">
      {props.reverse ? (
        <section className="relative flex flex-col-reverse justify-center lg:flex-row-reverse lg:items-center">
          <div className="bg-base-200/80 lg:w-7/12 lg:h-[720px] lg:px-24 lg:py-4 lg:rounded-3xl">
            <div className="text-lg leading-10 p-2 lg:text-2xl lg:leading-[2] lg:py-4 lg:px-2 lg:w-10/12 lg:ml-auto">
              {props?.title && (
                <div className="font-bold text-4xl leading-[4]">
                  {props.title}
                </div>
              )}
              {props.content}
            </div>
          </div>
          <div className="relative bg-base-300 rounded-xl lg:w-5/12 lg:h-[600px] lg:-mr-10 z-[1] lg:rounded-3xl object-fill">
            {props.children}
            <LinesSvg />
          </div>
        </section>
      ) : (
        <section className="relative flex flex-col-reverse justify-center lg:flex-row lg:items-center">
          <div className="bg-base-200/80 lg:w-7/12 lg:h-[720px] lg:px-24 lg:py-4 lg:rounded-3xl">
            <div className="text-lg leading-10 p-2 lg:text-2xl lg:leading-[2] lg:py-4 lg:w-10/12">
              {props.title && (
                <div className="font-bold text-4xl py-12">{props.title}</div>
              )}
              {props.content}
            </div>
          </div>
          <div className="relative bg-base-300 rounded-xl lg:w-5/12 lg:h-[600px] lg:-ml-10 order-1 lg:rounded-3xl object-fill">
            {props.children}
            <LinesSvgReverse />
          </div>
        </section>
      )}
    </section>
  );
};

export default SDG;
