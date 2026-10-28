import Link from "next/link";
import Head from "next/head";
import { FaArrowRight, FaCheck, FaPhoneAlt } from "react-icons/fa";
import { services, getService } from "../../data/services";

export async function getStaticPaths() {
  return {
    paths: services.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { service: getService(params.slug) } };
}

export default function ServicePage({ service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Head>
        <title>{`${service.title} | Luxury Dental Clinic`}</title>
        <meta name="description" content={service.summary} />
      </Head>

      <section className="bg-white pt-32 pb-14 border-b border-main-color/10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-4">
              <Link
                href="/services"
                className="text-primary-color no-underline hover:underline"
              >
                Services
              </Link>{" "}
              · {service.title}
            </p>
            <h1 className="text-4xl md:text-5xl text-main-color">
              {service.title}
            </h1>
            <p className="text-main-color/70 mt-5 max-w-xl leading-relaxed">
              {service.summary}
            </p>
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 mt-8 bg-primary-color hover:bg-dark-primary-color text-white no-underline rounded-full px-7 py-3 text-sm font-medium transition-colors"
            >
              Book an Appointment
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <img
            src={encodeURI(service.image)}
            alt={service.title}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">
            <div>
              <p className="eyebrow mb-3">Overview</p>
              <h2 className="text-3xl mb-4">What is it?</h2>
              <p className="text-main-color/80 leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">Is it for you?</p>
              <h2 className="text-3xl mb-4">Who is it for?</h2>
              <ul className="list-none p-0 space-y-3">
                {service.goodFor.map((item) => (
                  <li key={item} className="flex gap-3 text-main-color/80">
                    <FaCheck className="text-primary-color mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Benefits</p>
              <h2 className="text-3xl mb-4">Why choose it</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-2xl p-5 shadow-sm text-main-color/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3">The process</p>
              <h2 className="text-3xl mb-6">What to expect</h2>
              <ol className="list-none p-0 space-y-6">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-x-5">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-main-color text-white flex items-center justify-center font-display">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="text-main-color/80 mb-0 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="eyebrow mb-3">Questions</p>
              <h2 className="text-3xl mb-6">Frequently asked</h2>
              <div className="space-y-3">
                {service.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group bg-white rounded-2xl px-6 py-4 shadow-sm"
                  >
                    <summary className="cursor-pointer font-medium list-none flex justify-between items-center">
                      {f.q}
                      <span className="text-primary-color text-xl transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 mb-0 text-main-color/80 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <div className="bg-main-color text-white rounded-2xl p-7">
              <h3 className="font-display text-2xl text-white mb-3">
                Book a visit
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Choose your doctor and a time that suits you. We will confirm
                your appointment.
              </p>
              <Link
                href="/booking"
                className="block text-center bg-primary-color hover:bg-dark-primary-color text-white no-underline rounded-full px-6 py-3 text-sm font-medium transition-colors"
              >
                Book Appointment
              </Link>
              <a
                href="tel:01032946286"
                className="mt-4 flex items-center justify-center gap-2 text-white no-underline text-sm"
              >
                <FaPhoneAlt className="text-xs" /> 01032946286
              </a>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <h3 className="font-display text-xl mb-4">Other services</h3>
              <ul className="list-none p-0 space-y-3 mb-0">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center justify-between text-main-color no-underline hover:text-primary-color"
                    >
                      {s.title}
                      <FaArrowRight className="text-xs text-primary-color" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
