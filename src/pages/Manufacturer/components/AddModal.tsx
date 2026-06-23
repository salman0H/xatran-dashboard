// src/pages/Manufacturer/components/AddModal.tsx
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import type { ActiveTab } from '../types/manufacturer.types'

interface AddModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (values: any) => Promise<void>
  activeTab: ActiveTab
}

const manufacturerSchema = z.object({
  name: z.string().min(1, 'Required'),
  brand: z.string().min(1, 'Required'),
  website: z.string().url('Invalid URL').optional(),
  phone: z.string().min(1, 'Required'),
  address: z.string().optional(),
})

const modelSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  releaseDate: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
})

const seriesSchema = z.object({
  name: z.string().min(1, 'Required'),
  code: z.string().min(1, 'Required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
})

export function AddModal({ open, onClose, onSuccess, activeTab }: AddModalProps) {
  const { t } = useTranslation('manufacturer')
  const schema = activeTab === 'manufacturers' ? manufacturerSchema : activeTab === 'models' ? modelSchema : seriesSchema
  type FormValues = z.infer<typeof schema>

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: activeTab === 'manufacturers'
      ? { name: '', brand: '', website: '', phone: '', address: '' }
      : activeTab === 'models'
      ? { name: '', description: '', releaseDate: '', status: 'active' }
      : { name: '', code: '', description: '', status: 'active' },
  })

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const onSubmit = async (values: FormValues) => {
    await onSuccess(values)
    reset()
    onClose()
  }

  const renderForm = () => {
    if (activeTab === 'manufacturers') {
      return (
        <>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('companyName')} required validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                <Input {...field} placeholder={t('enterCompanyName')} />
              </Form.Item>
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('brand')} required validateStatus={errors.brand ? 'error' : ''} help={errors.brand?.message}>
                <Input {...field} placeholder={t('enterBrand')} />
              </Form.Item>
            )}
          />
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('website')} validateStatus={errors.website ? 'error' : ''} help={errors.website?.message}>
                <Input {...field} placeholder={t('enterWebsite')} />
              </Form.Item>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('phone')} required validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
                <Input {...field} placeholder={t('enterPhone')} />
              </Form.Item>
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('address')} validateStatus={errors.address ? 'error' : ''} help={errors.address?.message}>
                <Input.TextArea {...field} placeholder={t('enterAddress')} rows={2} />
              </Form.Item>
            )}
          />
        </>
      )
    }

    if (activeTab === 'models') {
      return (
        <>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('modelName')} required validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                <Input {...field} placeholder={t('enterModelName')} />
              </Form.Item>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('description')} validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
                <Input.TextArea {...field} placeholder={t('enterDescription')} rows={2} />
              </Form.Item>
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('releaseDate')} validateStatus={errors.releaseDate ? 'error' : ''} help={errors.releaseDate?.message}>
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('status')} validateStatus={errors.status ? 'error' : ''} help={errors.status?.message}>
                <Select {...field} options={[
                  { value: 'active', label: t('active') },
                  { value: 'inactive', label: t('inactive') },
                ]} />
              </Form.Item>
            )}
          />
        </>
      )
    }

    return (
      <>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('seriesName')} required validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
              <Input {...field} placeholder={t('enterSeriesName')} />
            </Form.Item>
          )}
        />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('seriesCode')} required validateStatus={errors.code ? 'error' : ''} help={errors.code?.message}>
              <Input {...field} placeholder={t('enterSeriesCode')} />
            </Form.Item>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('description')} validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
              <Input.TextArea {...field} placeholder={t('enterDescription')} rows={2} />
            </Form.Item>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('status')} validateStatus={errors.status ? 'error' : ''} help={errors.status?.message}>
              <Select {...field} options={[
                { value: 'active', label: t('active') },
                { value: 'inactive', label: t('inactive') },
              ]} />
            </Form.Item>
          )}
        />
      </>
    )
  }

  return (
    <Modal
      title={t(`add${activeTab === 'manufacturers' ? 'Manufacturer' : activeTab === 'models' ? 'Model' : 'Series'}`)}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('common:cancel')}
        </Button>,
        <Button key="submit" type="primary" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {t('common:submit')}
        </Button>,
      ]}
      destroyOnHidden
      width={600}
    >
      <Form layout="vertical">
        {renderForm()}
      </Form>
    </Modal>
  )
}