export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      authors: {
        Row: {
          biography: string | null
          created_at: string
          id: string
          instagram: string | null
          is_active: boolean
          linkedin: string | null
          name: string
          orcid: string | null
          photo_url: string | null
          profession: string | null
          registration: string | null
          slug: string
          specialty: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          biography?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          is_active?: boolean
          linkedin?: string | null
          name: string
          orcid?: string | null
          photo_url?: string | null
          profession?: string | null
          registration?: string | null
          slug: string
          specialty?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          biography?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          is_active?: boolean
          linkedin?: string | null
          name?: string
          orcid?: string | null
          photo_url?: string | null
          profession?: string | null
          registration?: string | null
          slug?: string
          specialty?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          kind: Database["public"]["Enums"]["content_kind"]
          meta_description: string | null
          name: string
          seo_title: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          kind: Database["public"]["Enums"]["content_kind"]
          meta_description?: string | null
          name: string
          seo_title?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          kind?: Database["public"]["Enums"]["content_kind"]
          meta_description?: string | null
          name?: string
          seo_title?: string | null
          slug?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          internal_notes: string | null
          message: string
          name: string
          phone: string
          privacy_consent: boolean
          status: Database["public"]["Enums"]["message_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          internal_notes?: string | null
          message: string
          name: string
          phone: string
          privacy_consent: boolean
          status?: Database["public"]["Enums"]["message_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          internal_notes?: string | null
          message?: string
          name?: string
          phone?: string
          privacy_consent?: boolean
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_items: {
        Row: {
          abstract: string | null
          author_id: string | null
          body: Json
          canonical_url: string | null
          category_id: string | null
          citation_abnt: string | null
          citation_vancouver: string | null
          cover_image_alt: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          doi: string | null
          excerpt: string | null
          faq: Json
          id: string
          institution: string | null
          is_featured: boolean
          issn: string | null
          issue: string | null
          journal: string | null
          keywords: string[]
          kind: Database["public"]["Enums"]["content_kind"]
          language: string | null
          license_type: string | null
          meta_description: string | null
          official_url: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          pages: string | null
          primary_keyword: string | null
          publication_year: number | null
          published_at: string | null
          reading_minutes: number | null
          references_list: Json
          rights_confirmed: boolean
          scheduled_for: string | null
          secondary_keywords: string[]
          seo_title: string | null
          slug: string
          source_name: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["content_status"]
          subtitle: string | null
          title: string
          updated_at: string
          updated_by: string | null
          volume: string | null
        }
        Insert: {
          abstract?: string | null
          author_id?: string | null
          body?: Json
          canonical_url?: string | null
          category_id?: string | null
          citation_abnt?: string | null
          citation_vancouver?: string | null
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          doi?: string | null
          excerpt?: string | null
          faq?: Json
          id?: string
          institution?: string | null
          is_featured?: boolean
          issn?: string | null
          issue?: string | null
          journal?: string | null
          keywords?: string[]
          kind: Database["public"]["Enums"]["content_kind"]
          language?: string | null
          license_type?: string | null
          meta_description?: string | null
          official_url?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          pages?: string | null
          primary_keyword?: string | null
          publication_year?: number | null
          published_at?: string | null
          reading_minutes?: number | null
          references_list?: Json
          rights_confirmed?: boolean
          scheduled_for?: string | null
          secondary_keywords?: string[]
          seo_title?: string | null
          slug: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          volume?: string | null
        }
        Update: {
          abstract?: string | null
          author_id?: string | null
          body?: Json
          canonical_url?: string | null
          category_id?: string | null
          citation_abnt?: string | null
          citation_vancouver?: string | null
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          doi?: string | null
          excerpt?: string | null
          faq?: Json
          id?: string
          institution?: string | null
          is_featured?: boolean
          issn?: string | null
          issue?: string | null
          journal?: string | null
          keywords?: string[]
          kind?: Database["public"]["Enums"]["content_kind"]
          language?: string | null
          license_type?: string | null
          meta_description?: string | null
          official_url?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          pages?: string | null
          primary_keyword?: string | null
          publication_year?: number | null
          published_at?: string | null
          reading_minutes?: number | null
          references_list?: Json
          rights_confirmed?: boolean
          scheduled_for?: string | null
          secondary_keywords?: string[]
          seo_title?: string | null
          slug?: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_items_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_tags: {
        Row: {
          content_id: string
          tag_id: string
        }
        Insert: {
          content_id: string
          tag_id: string
        }
        Update: {
          content_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          alt_text: string
          category: string
          created_at: string
          credit: string | null
          description: string | null
          file_url: string
          id: string
          is_active: boolean
          mime_type: string | null
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text: string
          category: string
          created_at?: string
          credit?: string | null
          description?: string | null
          file_url: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string
          category?: string
          created_at?: string
          credit?: string | null
          description?: string | null
          file_url?: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          body: Json
          canonical_url: string | null
          created_at: string
          created_by: string | null
          eyebrow: string | null
          id: string
          image_alt: string | null
          image_url: string | null
          meta_description: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          published_at: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: Json
          canonical_url?: string | null
          created_at?: string
          created_by?: string | null
          eyebrow?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          meta_description?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          published_at?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: Json
          canonical_url?: string | null
          created_at?: string
          created_by?: string | null
          eyebrow?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          meta_description?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          published_at?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      redirects: {
        Row: {
          created_at: string
          from_path: string
          id: string
          is_active: boolean
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_path: string
          id?: string
          is_active?: boolean
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_path?: string
          id?: string
          is_active?: boolean
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          analytics_id: string | null
          clinic_name: string
          default_whatsapp_message: string
          email: string
          google_business_url: string | null
          id: string
          instagram: string | null
          maps_url: string | null
          opening_hours: Json
          postal_code: string
          professional_registration: string | null
          tag_manager_id: string | null
          technical_director: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          address: string
          analytics_id?: string | null
          clinic_name: string
          default_whatsapp_message: string
          email: string
          google_business_url?: string | null
          id?: string
          instagram?: string | null
          maps_url?: string | null
          opening_hours?: Json
          postal_code: string
          professional_registration?: string | null
          tag_manager_id?: string | null
          technical_director?: string | null
          updated_at?: string
          whatsapp: string
        }
        Update: {
          address?: string
          analytics_id?: string | null
          clinic_name?: string
          default_whatsapp_message?: string
          email?: string
          google_business_url?: string | null
          id?: string
          instagram?: string | null
          maps_url?: string | null
          opening_hours?: Json
          postal_code?: string
          professional_registration?: string | null
          tag_manager_id?: string | null
          technical_director?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      treatments: {
        Row: {
          body: Json
          canonical_url: string | null
          category: string
          considerations: Json
          created_at: string
          created_by: string | null
          display_order: number
          faqs: Json
          id: string
          image_alt: string | null
          image_url: string | null
          indications: Json
          meta_description: string | null
          name: string
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          process_steps: Json
          published_at: string | null
          seo_title: string | null
          short_description: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: Json
          canonical_url?: string | null
          category: string
          considerations?: Json
          created_at?: string
          created_by?: string | null
          display_order?: number
          faqs?: Json
          id?: string
          image_alt?: string | null
          image_url?: string | null
          indications?: Json
          meta_description?: string | null
          name: string
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          process_steps?: Json
          published_at?: string | null
          seo_title?: string | null
          short_description: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: Json
          canonical_url?: string | null
          category?: string
          considerations?: Json
          created_at?: string
          created_by?: string | null
          display_order?: number
          faqs?: Json
          id?: string
          image_alt?: string | null
          image_url?: string | null
          indications?: Json
          meta_description?: string | null
          name?: string
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          process_steps?: Json
          published_at?: string | null
          seo_title?: string | null
          short_description?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "author"
      content_kind: "educational" | "news" | "scientific"
      content_status: "draft" | "scheduled" | "published" | "archived"
      message_status: "new" | "in_progress" | "answered" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "author"],
      content_kind: ["educational", "news", "scientific"],
      content_status: ["draft", "scheduled", "published", "archived"],
      message_status: ["new", "in_progress", "answered", "archived"],
    },
  },
} as const
