import React from 'react'
import { Link } from 'next-view-transitions'

import type { CaseStudy, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'

export type CaseStudyCardData = Pick<
  CaseStudy,
  'slug' | 'title' | 'companyName' | 'companyLogo' | 'categories' | 'heroImage' | 'meta'
>

export const CaseStudyCard: React.FC<{ caseStudy: CaseStudyCardData }> = ({ caseStudy }) => {
  const { slug, title, companyName, companyLogo, categories, heroImage, meta } = caseStudy

  const image =
    heroImage && typeof heroImage === 'object'
      ? heroImage
      : meta?.image && typeof meta.image === 'object'
        ? meta.image
        : null

  const logo = companyLogo && typeof companyLogo === 'object' ? companyLogo : null

  const resolvedCategories =
    categories?.filter(
      (c): c is Category => typeof c === 'object' && c !== null,
    ) ?? []

  const href = `/resources/case-studies/${slug}`

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative rounded-lg overflow-hidden aspect-[3/2] bg-brand-linen mb-8">
          {image ? (
            <>
              <Media
                resource={image}
                pictureClassName="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                htmlElement={null}
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
            </>
          ) : (
            <div className="absolute inset-0 bg-brand-black/80 rounded-lg" />
          )}
          {logo && (
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <Media
                resource={logo}
                pictureClassName="max-w-[60%] max-h-[40%] relative z-10"
                imgClassName="object-contain w-full h-full"
                htmlElement={null}
              />
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        {resolvedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resolvedCategories.map((cat) => (
              <Tag key={cat.id} label={cat.title} variant="secondary" />
            ))}
          </div>
        )}

        {companyName && (
          <div className="flex items-center gap-2 type-eyebrow text-brand-black">
            <span>{companyName}</span>
            <span className="text-brand-gray-med">&times;</span>
            <span>Reach</span>
          </div>
        )}

        <Link href={href}>
          <h3 className="type-display-sm max-w-[414px]">{title}</h3>
        </Link>
      </div>
    </article>
  )
}
