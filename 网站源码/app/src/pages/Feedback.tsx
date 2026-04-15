import { useState } from 'react';
import { Send, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Feedback = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '请输入姓名';
        if (value.trim().length < 2) return '姓名至少需要2个字符';
        if (value.trim().length > 50) return '姓名不能超过50个字符';
        return undefined;
      case 'email':
        if (!value.trim()) return '请输入邮箱';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return '请输入有效的邮箱地址';
        return undefined;
      case 'message':
        if (!value.trim()) return '请输入反馈内容';
        if (value.trim().length < 10) return '反馈内容至少需要10个字符';
        if (value.trim().length > 1000) return '反馈内容不能超过1000个字符';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTouched({});
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    const baseClass = 'w-full pl-12 pr-4 py-4 bg-white rounded-xl border outline-none transition-all duration-300';
    const errorClass = errors[fieldName] && touched[fieldName]
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-[var(--medium-gray)] focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/20';
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="min-h-screen bg-[var(--light-gray)] pt-24 pb-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--dark-gray)] mb-4">
            留言反馈
          </h1>
          <p className="text-[var(--text-gray)] max-w-xl mx-auto">
            您的意见和建议对我们非常重要，请随时与我们联系
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--dark-gray)] mb-2"
              >
                姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-gray)]" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="请输入您的姓名"
                  className={getInputClassName('name')}
                  maxLength={50}
                />
              </div>
              {errors.name && touched.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--dark-gray)] mb-2"
              >
                邮箱 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-gray)]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="请输入您的邮箱地址"
                  className={getInputClassName('email')}
                />
              </div>
              {errors.email && touched.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--dark-gray)] mb-2"
              >
                反馈内容 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[var(--text-gray)]" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="请输入您的反馈内容（至少10个字符）"
                  rows={6}
                  className={`${getInputClassName('message')} resize-none`}
                  maxLength={1000}
                />
              </div>
              <div className="flex justify-between mt-2">
                {errors.message && touched.message ? (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-sm text-[var(--text-gray)]">
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--orange)] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[var(--orange)]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  提交反馈
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-[var(--medium-gray)]">
            <h3 className="text-lg font-semibold text-[var(--dark-gray)] mb-4">
              其他联系方式
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-[var(--text-gray)]">
                <div className="w-10 h-10 bg-[var(--light-gray)] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--dark-gray)]">
                    电子邮件
                  </div>
                  <div className="text-sm">contact@navhub.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-gray)]">
                <div className="w-10 h-10 bg-[var(--light-gray)] rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--dark-gray)]">
                    社交媒体
                  </div>
                  <div className="text-sm">@NavHub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <DialogTitle className="text-xl font-bold text-[var(--dark-gray)]">
              提交成功
            </DialogTitle>
            <DialogDescription className="text-[var(--text-gray)]">
              感谢您的反馈！我们会尽快查看并回复您。
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-[var(--orange)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--orange)]/90 transition-colors duration-300"
            >
              确定
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feedback;
