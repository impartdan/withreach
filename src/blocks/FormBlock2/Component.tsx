import React from 'react'
import type { FormBlock2Type as FormBlock2Props } from '@/payload-types'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'

export const FormBlock2Component: React.FC<FormBlock2Props> = ({
  heading,
  description,
  form,
}) => {
  return (
    <div className="container">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <RichText
              className="text-base md:text-lg text-brand-black/70 leading-[1.5] [&>p]:mb-0"
              data={description}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>

        {/* Form */}
        {form && typeof form !== 'string' && typeof form !== 'number' && (
          // @ts-expect-error form type mismatch between Payload generated types and plugin types
          <FormBlock form={form} enableIntro={false} />
        )}
      </div>
    </div>
  )
}
