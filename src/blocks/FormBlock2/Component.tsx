import React from 'react'
import type { FormBlock2Type as FormBlock2Props } from '@/payload-types'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'

export const FormBlock2Component: React.FC<FormBlock2Props> = ({ heading, description, form }) => {
  return (
    <div className="container">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          {heading && <h2 className="type-display-md text-brand-black mb-4">{heading}</h2>}
          {description && <RichText data={description} enableGutter={false} enableProse={true} />}
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
