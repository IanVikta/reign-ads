<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('company')->nullable()->after('phone');
            $table->string('service')->nullable()->after('company');
            $table->string('timeline')->nullable()->after('service');
            $table->text('locations')->nullable()->after('timeline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropColumn(['company', 'service', 'timeline', 'locations']);
        });
    }
};
